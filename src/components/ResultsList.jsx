import React, { useState, useEffect } from "react";

const ResultsList = (props) => {
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className=" sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  {Object.keys(props.savedData[0]).map((key, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="text-xs font-small text-gray-900 px-2 py-2 text-left"
                      >
                        {key}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Object.entries(props.savedData).map(([key, value]) => {
                  return (
                    <tr className="border-b">

                      {Object.entries(value).map(([key, value]) => {

                        return (
                          <td className="px-2 py-2 text-xs font-small text-gray-900">
                            {value.toString()}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsList;

