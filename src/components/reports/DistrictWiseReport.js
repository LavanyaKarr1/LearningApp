import React, { useEffect, useState } from "react";
import commonAxios from "../../axios/CommonAxios";
import ApiUrls from "../../API-urls/api-urls";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const DistrictWiseReport = () => {

    const [distReport, setDistReport] = useState([]);
    const [distDrillReport, setDistDrillReport] = useState([]);

    const navigate=useNavigate();

    const getDistReport = async () => {
        // console.log("report");

        await commonAxios.get(ApiUrls.contextURL + "distWiseReport").then((res) => {
            
            if (res.data.success === true) {
                // console.log("API Response:", res.data.data);
                setDistReport(res.data.data);
            }
            else {
                setDistReport([]);
            }
        })
    }

    useEffect(() => {
        getDistReport();
    }, []);

const total=distReport.reduce((sum, item) => sum + Number(item.appl_count), 0);
// console.log("total",total);

    const columns = React.useMemo(
        () => [
            {
                header: "Sno",
                cell: ({row}) =>row.index+1,
                footer:"Total"
            },
            {
                header: "District Name",
                accessorKey: "dist_name"
            },
            {
                header: "Application Count",
                accessorKey: "appl_count",
                footer:() =>total
            },
        ],
        []
    );

    const table = useReactTable({
        data:distReport,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
    //   console.log("Header Groups", table.getHeaderGroups());
// console.log("Rows", table.getRowModel().rows);

const handleBack=()=>{
    navigate("/home")
}


    return (
        <>
            <div className="container border d-flex flex-column align-items-center mt-5 ">
                <h5>District Wise Report</h5>
                <div className="w-100 d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
                <table border="1" cellPadding="10" className="mt-3 mb-4 table table-bordered">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup)=>(
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header)=>(
                                    <th key={header.id} style={{textAlign:"center"}}>
                                        {flexRender(header.column.columnDef.header,header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
    {table.getFooterGroups().map((footerGroup) => (
      <tr key={footerGroup.id}>
        {footerGroup.headers.map((header) => (
          <td key={header.id}>
            {flexRender(header.column.columnDef.footer, header.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tfoot>

                </table>

            </div>
        </>
    )
}
export default DistrictWiseReport;