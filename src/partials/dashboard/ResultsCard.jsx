import React, { Component } from "react";
import FilesList from "../../components/FilesList";
import axios from "axios";
import { SOLVER_TYPE, FILE_STATUS_TYPE } from "../../constants/files";
import ResultsList from "../../components/ResultsList";
class ResultsCard extends Component {
  constructor() {
    super();
    this.state = {
      savedData: [],
      saveBucket: "pv.insight.test",
      saveFilePath: "tmp/",
      saveFileName: "",
      isDeleteData:false
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSaveFile = this.handleSaveFile.bind(this)
  }
  componentDidMount() {
    this.getSavedResults();
  }

  handleSaveFile(){
    console.log(this.state.saveFileName)
    if (this.state.saveFileName.length < 3 || this.state.saveFileName.length > 32){
      console.log("filename length is too short  or too long")
      // sanity check
    }else{
      axios({
        method: "post",
        // url: `${process.env.REACT_APP_API_SERVICE_URL}/solardata/run_process_file`,
        url: `http://localhost:5010/solardata/save_all_results_from_db_to_s3`,
        data: {
          bucket_name: this.state.saveBucket,
          file_path: this.state.saveFilePath,
          file_name: `${this.state.saveFileName}.csv`,
          delete_data: this.state.isDeleteData
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({saveFileName:""})
  }

  getSavedResults() {
    axios({
      method: "get",
      // url: `${process.env.REACT_APP_API_SERVICE_URL}/solardata/list_files`,
      url: `http://localhost:5010/solardata/all_results`,
      data: {},
    })
      .then((res) => {
        this.setState({
          savedData: [...this.state.savedData, ...res.data["solardata"]],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInputChange(e){
    this.setState({saveFileName: e.target.value})
  }
  render() {
    return (
      <div className="col-span-full xl:col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <span class="text-xs font-semibold inline-block py-1 px-2  rounded text-teal-600 bg-teal-200  last:mr-0 mr-1">
            {this.state.saveBucket}
          </span>
          <span class="text-xs font-semibold inline-block py-1 px-2 rounded text-violet-600 bg-violet-200  last:mr-0 mr-1">
            {this.state.saveFilePath}
          </span>
          <input
            id="save file "
            type="text"
            className="mt-1 focus:shadow-md mr-1 "
            required
            autofocus
            autocomplete="username"
            value={this.state.saveFileName}
            onChange = {this.handleInputChange}
            // value={this.steate.saveFileName}
          />
          <span class="text-xs font-semibold inline-block py-1 px-2 rounded text-violet-600 bg-violet-200  last:mr-0 mr-4">
            .csv
          </span>
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={this.handleSaveFile}>
            <span className="hidden xs:block">Save files </span>
          </button>
        </header>
        <div className="p-3">
          {/* Card content */}
          {/* "Today" group */}
          <div>
            <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
              Today
            </header>

            {this.state.savedData.length > 0 ? (
              <ResultsList savedData={this.state.savedData} />
            ) : (
              <p>No save data</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsCard;
