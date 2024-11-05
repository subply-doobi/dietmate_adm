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
import { IProduct, IProductSummary } from "../../shared/api/types/product";
import { BASE_URL } from "../../shared/api/urls";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

const idToLabel: {
  [T in keyof IProductSummary]: string;
} = {
  statusNm: "상태",
  mainAttUrl: "이미지",
  platformNm: "판매자명",
  productNm: "제품명",
  price: "가격",
  shippingPrice: "배송비",
  freeShippingPrice: "무배",
  calorie: "칼",
  carb: "탄",
  protein: "단",
  fat: "지",
  productNo: "제품번호",
};

const statusValueToLabel: {
  [T in IProductSummary["statusNm"]]: string;
} = {
  판매중: "판매중",
  재고없음: "재고없음",
  영구삭제: "영구삭제",
};

const statusValueToColor: {
  [T in IProductSummary["statusNm"]]: string;
} = {
  판매중: colors.greenBadge,
  재고없음: colors.yellowBadge,
  영구삭제: colors.redBadge,
};

const idToColFlex: {
  [T in keyof IProductSummary]: number;
} = {
  statusNm: 0.5,
  mainAttUrl: 0.5,
  platformNm: 0.7,
  productNm: 1,
  price: 0.5,
  shippingPrice: 0.5,
  freeShippingPrice: 0.5,
  calorie: 0.3,
  carb: 0.3,
  protein: 0.3,
  fat: 0.3,
  productNo: 1,
};

interface ITable {
  tableData: IProduct[];
}
export default function ProductTable({ tableData }: ITable) {
  // redux
  const dispatch = useAppDispatch();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      {
        accessorKey: "statusNm",
        cell: (info) => (
          <TextBadge
            badgeText={statusValueToLabel[info.getValue()]}
            color={statusValueToColor[info.getValue()]}
            style={{ width: "80%" }}
          />
        ),
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "mainAttUrl",
        cell: (info) => <Thumbnail src={`${BASE_URL}${info.getValue()}`} />,
      },
      {
        accessorKey: "platformNm",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "productNm",
        cell: (info) => <Cell>{info.getValue()}</Cell>,
      },
      {
        accessorKey: "price",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
        // meta: {
        //   filterVariant: "range",
        // },
      },
      {
        accessorKey: "shippingPrice",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "freeShippingPrice",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "calorie",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "carb",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "protein",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "fat",
        cell: (info) => <Cell>{parseInt(info.getValue(), 10)}</Cell>,
      },
      {
        accessorKey: "productNo",
        cell: (info) => <Cell fontSize={8}>{info.getValue()}</Cell>,
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

  const openProductPage = (dataId: string) => {
    dispatch(openRightModal({ modalOption: "Product", dataId }));
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
                      flex: idToColFlex[header.id as keyof IProduct] || 1,
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
                            {idToLabel[header.id as keyof IProduct] ??
                              header.id}
                          </TextMain>
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {/* 필터! */}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <ClientFilter
                              column={header.column}
                              tableType="Product"
                            />
                          </div>
                        ) : null} */}
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
                onClick={() => openProductPage(row.original.productNo)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        flex:
                          idToColFlex[cell.column.id as keyof IProduct] || 1,
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
  height: 40px;
  display: flex;
  align-items: center;
  background-color: ${colors.dark};
`;

const TrBody = styled.tr<{ index: number }>`
  height: 72px;
  display: flex;
  background-color: ${({ index }) =>
    index % 2 === 0 ? colors.backgroundLight : colors.white};
  :hover {
    cursor: pointer;
    background-color: ${colors.highlight2};
  }
`;

const Td = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
`;
