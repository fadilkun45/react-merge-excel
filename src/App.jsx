import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

function App() {

  const [file, setFile] = useState([])


  const uploadFile = (item, name) => {
    console.log(file)
    setFile([
      ...file, item.target.files[0]
    ])

    // if (name === "file1") {
    //   setFile([
    //     ...file, item.target.files[0]
    //   ])
    // } else {

    // }
  }

  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  function generateArrayBufferFromXLSX(file) {
    console.log(file)

    return readFileAsArrayBuffer(file)
      .then(arrayBuffer => {
        return arrayBuffer;
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  }



  const mergeXLSX = async () => {
    // Load each xlsx file

    // const file1 = XLSX.readFile(await generateArrayBufferFromXLSX(file?.file1), { type: "buffer" });
    // const file2 = XLSX.readFile(await generateArrayBufferFromXLSX(file?.file2), { type: "buffer" });

    let datas = []

    for (let i = 0; i < file.length; i++) {
      // console.log(file[i])
      const file1 = XLSX.readFile(await generateArrayBufferFromXLSX(file[i]), { type: "buffer" });
      const sheet = file1.Sheets['Sheet1'];
      const data = XLSX.utils.sheet_to_json(sheet);


      datas.push(...data)

      console.log(datas)

    }


    // useEffect(() => {
    //   console.log(file)
    // },[file])

    // // Parse the data from each file
    // const sheet1 = file1.Sheets['Sheet1'];
    // const sheet2 = file2.Sheets['Sheet1'];
    // const data1 = XLSX.utils.sheet_to_json(sheet1);
    // const data2 = XLSX.utils.sheet_to_json(sheet2);

    // // Combine the data into a single array
    // const combinedData = data1.concat(data2);

    // Create a new workbook and worksheet
    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(datas);

    // Add the data to the new worksheet
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Combined Data');

    // Save the new workbook as a single xlsx file
    XLSX.writeFile(newWorkbook, 'combined.xlsx');
    // Note that this code assumes that both xlsx files have a single sheet named "Sheet1".If your files have different sheet names or multiple sheets, you will need to modify the code accordingly.

  }

  return (
    <div className="App">
      <input type="file" onChange={(v) => uploadFile(v, "file1")} />
      <input type="file" onChange={(v) => uploadFile(v, "file2")} />
      <button onClick={mergeXLSX}>generate xlsx</button>
    </div>
  )
}

export default App
