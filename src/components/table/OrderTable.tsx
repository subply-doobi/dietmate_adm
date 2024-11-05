import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { IOrder } from "../../shared/api/types/order";
import ClientFilter from "./ClientFilter";
import styled from "styled-components";
import { colors } from "../../shared/styles/colors";
import { HorizontalSpace, Row, TextMain } from "../../shared/ui/styledComps";
import Cell from "./Cell";
import TextBadge from "../../shared/ui/TextBadge";
import { openRightModal } from "../../features/modal/modalSlice";
import { useAppDispatch } from "../../app/reduxStore/hooks";
import { ORDER_RESULT_STATUS_CD_OBJ } from "../../shared/consts";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

const idToLabel: {
  [T in keyof Partial<IOrder>]: string;
} = {
  resultStatusCd: "주문상태",
  buyerName: "구매자",
  buyerTel: "연락처",
  buyerAddr: "주소",
  orderPrice: "가격",
  orderDate: "주문일",
  request: "요청사항",
  orderNo: "주문번호",
};

const statusValueToLabel: {
  [T in IOrder["resultStatusCd"]]: string;
} = {
  SP013001: "확인중",
  SP013002: "재고없음",
  SP013003: "환불요청",
  SP013004: "처리완료",
};

const statusValueToColor: {
  [T in IOrder["resultStatusCd"]]: string;
} = {
  SP013001: colors.greenBadge,
  SP013002: colors.yellowBadge,
  SP013003: colors.redBadge,
  SP013004: colors.purpleBadge,
};

const idToColFlex: {
  [T in keyof Partial<IOrder>]: number;
} = {
  statusNm: 0.5,
  buyerName: 0.7,
  buyerTel: 1,
  buyerAddr: 1.5,
  orderPrice: 0.5,
  orderDate: 1,
  request: 0.5,
  orderNo: 1,
};

interface ITable {
  tableData: IOrder[];
}
export default function OrderTable({ tableData }: ITable) {
  // redux
  const dispatch = useAppDispatch();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns = useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      {
        accessorKey: "resultStatusCd",
        cell: (info) => (
          <TextBadge
            badgeText={
              ORDER_RESULT_STATUS_CD_OBJ[
                info.getValue() as IOrder["resultStatusCd"]
              ].label ?? info.getValue()
            }
            color={
              ORDER_RESULT_STATUS_CD_OBJ[
                info.getValue() as IOrder["resultStatusCd"]
              ].color ?? colors.black
            }
            style={{ width: "80%" }}
          />
        ),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "buyerName",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "buyerTel",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "buyerAddr",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "orderPrice",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "orderDate",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "request",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "orderNo",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns: columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    autoResetPageIndex: false,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const onRowPress = (dataId: string) => {
    dispatch(openRightModal({ modalOption: "Order", dataId }));
  };

  return (
    <Container>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TrHeader key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // console.log(header);
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      flex: idToColFlex[header.id as keyof IOrder] || 1,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {/* {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )} */}
                          <TextMain
                            style={{
                              color: colors.white,
                              fontSize: 14,
                              fontWeight: "normal",
                            }}
                          >
                            {idToLabel[header.id as keyof IOrder] ?? header.id}
                          </TextMain>
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <ClientFilter
                              column={header.column}
                              tableType="Order"
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </Th>
                );
              })}
            </TrHeader>
          ))}
        </thead>
        <TBody>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <TrBody
                key={row.id}
                index={i}
                onClick={() => onRowPress(row.original.orderNo)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        flex: idToColFlex[cell.column.id as keyof IOrder] || 1,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </TrBody>
            );
          })}
        </TBody>
      </table>
      <HorizontalSpace height={16} />

      {/* 페이지 이동 버튼 */}
      <Row style={{ columnGap: 8, alignSelf: "center" }}>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </Row>
      <Row style={{ alignSelf: "center", columnGap: 16, marginTop: 24 }}>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
        <span>
          | Go to page :{" "}
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      </Row>
      <pre>
        {JSON.stringify(
          { columnFilters: table.getState().columnFilters },
          null,
          2
        )}
      </pre>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.15);
  background-color: ${colors.white};
  padding: 8px;
`;

const TBody = styled.tbody``;

const Th = styled.th``;

const TrHeader = styled.tr`
  height: 80px;
  display: flex;
  background-color: ${colors.dark};
`;

const TrBody = styled.tr<{ index: number }>`
  height: 72px;
  display: flex;
  background-color: ${({ index }) =>
    index % 2 === 0 ? colors.backgroundLight : colors.white};
  :hover {
    cursor: pointer;
    background-color: ${colors.highlight};
  }
`;

const Td = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
