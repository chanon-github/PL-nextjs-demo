import { useState } from 'react';
import { TableRowSelection } from 'antd/es/table/interface';

interface RowData {
  code?: string|null; // Optional
  id?: number|null;   // Optional
  // other fields...
}


const useRowSelection = <T extends RowData>() => {
  const [selectedRowKeysList, setSelectedRowKeysList] = useState<(string|number)[]>([]);

  // const handleRowSelectionChange = (selectedRowKeys: string[], selectedRows: T[]) => {
  //   setSelectedRowKeysList((prevKeys) => {
  //     const mergedKeys = Array.from(new Set([...prevKeys, ...selectedRowKeys]));
  //     return mergedKeys;
  //   });
  // };

  const handleRowSelectionOne = (record: T, selected: boolean) => {

    const rowKey = record.id || record.code; // Use code or id
    if (selected && rowKey) {
      setSelectedRowKeysList((prevKeys) => [...prevKeys, rowKey]);
      // setSelectedRowKeysList((prevKeys)=>{
      //   console.log("prevKeys",prevKeys)
      //   return [...prevKeys,rowKey]
      // });

    } else if (rowKey) {
      setSelectedRowKeysList((prevKeys) => prevKeys.filter(key => key !== rowKey));
    }
  };

  const handleRowSelectionAll = (selected: boolean,selectedRows: T[], changeRows: T[]) => {

    
    const newSelectedKeys = changeRows.map(row => row.id || row.code).filter(Boolean) as string[];

    if (selected) {
      setSelectedRowKeysList(prevKeys => Array.from(new Set([...prevKeys, ...newSelectedKeys])));
    } else {
      setSelectedRowKeysList(prevKeys => prevKeys.filter(key => !newSelectedKeys.includes(key as string)));
    }
  };

  return {
    selectedRowKeysList,
    setSelectedRowKeysList,
    handleRowSelectionOne,
    handleRowSelectionAll,
  };
};

export default useRowSelection;
