import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

type TableSkeletonProps = {
  columns: number;
  rows?: number;
  cellSkeletonClassNames?: string[];
  rowKeyPrefix?: string;
};

function TableSkeleton({
  columns,
  rows = 6,
  cellSkeletonClassNames,
  rowKeyPrefix = "table-skeleton",
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`${rowKeyPrefix}-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={`${rowKeyPrefix}-${rowIndex}-${colIndex}`}>
              <Skeleton
                className={cellSkeletonClassNames?.[colIndex] ?? "h-4 w-24"}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default TableSkeleton;
