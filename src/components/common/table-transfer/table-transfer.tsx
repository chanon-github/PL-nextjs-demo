import React from 'react';
import { Table, Transfer } from 'antd';
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface TableTransferProps<T> extends TransferProps<TransferItem> {
  dataSource: T[];
  leftColumns: TableColumnsType<T>;
  rightColumns: TableColumnsType<T>;
  searchPlaceholder?:string
}

const TableTransfer = <T,>(props: TableTransferProps<T>) => {
  const { leftColumns, rightColumns,searchPlaceholder="Search...", showSearch ,locale,...restProps } = props;
  
  return (
    <Transfer style={{ width: '100%' }} showSearch={showSearch}      
        locale={{
        searchPlaceholder: searchPlaceholder ,
      }}    
      {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
        
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys as string[], 'replace');
          },
          selectedRowKeys: listSelectedKeys,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            // scroll={{ x: 'max-content' }}

            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) {
                  return;
                }
                console.log("key>>",key)
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;



// import React from 'react';
// import { Table, Transfer } from 'antd';
// import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';

// type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
// type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

// interface TableTransferProps<T> extends TransferProps<TransferItem> {
//   dataSource: T[];
//   leftColumns: TableColumnsType<T>;
//   rightColumns: TableColumnsType<T>;
//   searchPlaceholder?: string;
//   showSearch?: boolean;
// }

// const TableTransfer = <T,>(props: TableTransferProps<T>) => {
//   const { leftColumns, rightColumns, searchPlaceholder = "Search...", showSearch, ...restProps } = props;

//   // Modify columns to include responsive behavior
//   const responsiveLeftColumns = leftColumns.map(column => ({
//     ...column,
//     responsive: column.dataIndex === 'brand' ? ['xs', 'sm', 'md', 'lg', 'xl'] : ['md', 'lg', 'xl'], // Only show brand on smaller screens
//   }));

//   const responsiveRightColumns = rightColumns.map(column => ({
//     ...column,
//     responsive: column.dataIndex === 'brand' ? ['xs', 'sm', 'md', 'lg', 'xl'] : ['md', 'lg', 'xl'], // Same for right columns
//   }));

//   return (
//     <Transfer
//       style={{ width: '100%' }}
//       showSearch={showSearch}
//       locale={{
//         searchPlaceholder: searchPlaceholder,
//       }}
//       {...restProps}
//     >
//       {({
//         direction,
//         filteredItems,
//         onItemSelect,
//         onItemSelectAll,
//         selectedKeys: listSelectedKeys,
//         disabled: listDisabled,
//       }) => {
//         const columns = direction === 'left' ? responsiveLeftColumns : responsiveRightColumns;
//         const rowSelection: TableRowSelection<TransferItem> = {
//           getCheckboxProps: () => ({ disabled: listDisabled }),
//           onChange(selectedRowKeys) {
//             onItemSelectAll(selectedRowKeys as string[], 'replace');
//           },
//           selectedRowKeys: listSelectedKeys,
//           selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
//         };

//         return (
//           <div style={{ overflowX: 'auto' }}>
//             <Table
//               rowSelection={rowSelection}
//               columns={columns}
//               dataSource={filteredItems}
//               size="small"
//               pagination={false}
//               style={{ pointerEvents: listDisabled ? 'none' : undefined }}
//               onRow={({ key, disabled: itemDisabled }) => ({
//                 onClick: () => {
//                   if (itemDisabled || listDisabled) {
//                     return;
//                   }
//                   console.log("key>>", key);
//                   onItemSelect(key, !listSelectedKeys.includes(key));
//                 },
//               })}
//             />
//           </div>
//         );
//       }}
//     </Transfer>
//   );
// };

// export default TableTransfer;

