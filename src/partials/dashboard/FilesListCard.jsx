import React, { Component } from "react";
import FilesList from "../../components/FilesList";
import axios from "axios";
import {
  SOLVER_TYPE,
  FILE_STATUS_TYPE,
  COLUMN_NAME_TYPE,
} from "../../constants/files";

class FilesListCard extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      // checkedFiles: [],
      isSelectAll: false,
      selectBucket: "pv.insight.nrel",
      solver: SOLVER_TYPE.MOSEK,
      columnName: COLUMN_NAME_TYPE.POWERW,
      processFiles: [],
    };
    this.handleProcessData = this.handleProcessData.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    // this.handleProcessData = this.handleProcessData.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
  }
  componentDidMount() {
    this.getFiles();
  }

  getFiles() {
    axios({
      method: "post",
      // url: `${process.env.REACT_APP_API_SERVICE_URL}/solardata/list_files`,
      url: `http://localhost:5010/solardata/list_files`,
      data: {
        bucket_name: this.state.selectBucket,
      },
    })
      .then((res) => {
        this.setState({ files: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleCheckBox(event) {
    console.log("toggle check box ");
    if (event.target.checked) {
      // update file select
      // this.setState(prevState =>({
      //   files: prevState.files.map( file => file.key === event.target.value ? {...file, select: true}: file)
      // }))
      let updateFiles = [...this.state.files];
      var index = updateFiles.findIndex(
        (file) => file.Key === event.target.value
      );
      updateFiles[index].Select = true;
      this.setState({ files: updateFiles });
      // this.setState(
      //   files.map((file) => {
      //     return file.key === event.target.value
      //       ? { ...file, "Size": }
      //       : file;
      //   })
      // );

      // this.setState(
      //   { checkedFiles: [...this.state.checkedFiles, event.target.value] },
      //   () => {
      //     "Update check box";
      //   }
      // );
    } else {
      let updateFiles = [...this.state.files];
      var index = updateFiles.findIndex(
        (file) => file.Key === event.target.value
      );
      updateFiles[index].Select = false;
      this.setState({ files: updateFiles });
      // this.setState(
      //   files.map((file) => {
      //     return file.key === event.target.value
      //       ? { ...file, select: fla }
      //       : file;
      //   })
      // );

      // this.setState((prevState) => ({
      //   files: prevState.files.map((file) =>
      //     file.key === event.target.value ? { ...file, select: false } : file
      //   ),
      // }));

      // this.setState({
      //   checkedFiles: this.state.checkedFiles.filter(function (file) {
      //     return file !== event.target.value;
      //   }),
      // });
    }
  }
  toggleSelectAll() {
    this.setState({ isSelectAll: !this.state.isSelectAll }, () => {
      if (this.state.isSelectAll) {
        this.setState(
          {
            // checkedFiles: this.state.files.map((file) => {
            //   return file.Key;
            // }),
          },
          () => {
            console.log("add all check box");
            // console.log(this.state.checkedFiles);
          }
        );
      } else {
        this.setState({ checkedFiles: [] }, () => {
          console.log("delete all check box");
          // console.log(this.state.checkedFiles);
        });
      }
    });
  }

  handleProcessData() {
    const selectFile = this.state.files.filter(file =>file.Select === true)
    this.setState({ processFiles: selectFile }, () => {
        this.state.processFiles.map((processfile) => {
        const pathStrSplit = processfile.Key.split("/");
        const fileName = pathStrSplit.pop();
        const directoryName = pathStrSplit.join("/");
  
        // should move to redux-thunk
        axios({
          method: "post",
          // url: `${process.env.REACT_APP_API_SERVICE_URL}/solardata/run_process_file`,
          url: `http://localhost:5010/solardata/run_process_file`,
          data: {
            bucket_name: this.state.selectBucket,
            file_path: directoryName,
            file_name: fileName,
            column_name: this.state.columnName,
            solver: this.state.solver,
          },
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }

  render() {
    return (
      <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mr-4">
            <span className="hidden xs:block ml-2">
              Fetch file from {this.state.bucket_name}
            </span>
          </button>
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mr-4">
            <span className="hidden xs:block ml-2">
              Solver: {this.state.solver}
            </span>
          </button>
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mr-4">
            <span className="hidden xs:block ml-2">
              Column Name: {this.state.columnName}
            </span>
          </button>

          <button
            className="btn bg-indigo-900 hover:bg-indigo-600 text-white mr-4"
            onClick={this.handleProcessData}
          >
            <span className="hidden xs:block ml-2">Run selected files</span>
          </button>
        </header>
        <div className="p-3">
          <div>
            <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
              Number of select file:{" "}
              {this.state.files.filter((file) => file.Select === true).length}
            </header>
            {this.state.files.length > 0 ? (
              <FilesList
                files={this.state.files}
                handleRun={this.handleRun}
                toggleCheckBox={this.toggleCheckBox}
              />
            ) : (
              <p>No file found</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FilesListCard;
