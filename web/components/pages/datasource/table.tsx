"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { backendClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Fragment } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

type Props = {};

const DatasourceTable = (props: Props) => {
  const { data, isFetching } = useQuery<
    {
      id: string;
      name: string;
      engine: string;
      url: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >({
    queryKey: ["datasources"],
    queryFn: () => backendClient.get("/api/datasource").then((res) => res.data),
  });
  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NAME</TableHead>
            <TableHead>ENGINE</TableHead>
            <TableHead>CREATED</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        {data?.map((item) => (
          <TableBody key={item.id}>
            <TableRow>
              <TableCell className="font-medium">
                <p>{item.name}</p>
              </TableCell>
              <TableCell>
                <p>{item.engine}</p>
              </TableCell>
              <TableCell>
                <p>
                  {formatDistance(new Date(item.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </TableCell>
              <TableCell>
                <p>actions</p>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      <div className="flex w-full justify-center font-light">
        {data?.length === 0 && <p>No data sources.</p>}
        {isFetching && (
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        )}
      </div>
    </Fragment>
  );
};

export default DatasourceTable;
