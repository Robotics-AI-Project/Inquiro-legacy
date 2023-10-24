import DatasourceTable from "@/components/pages/datasource/table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/nav";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Datasource = (props: Props) => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-5xl">Data Sources</h1>
      <div className="flex justify-between items-start">
        <p className="w-[520px] font-light text-base">
          Connect to a data source or import its schema manually. Once you have
          added a data source, it will appear in this library.
        </p>
        <Link href={ROUTES.DATASOURCE_ADD}>
          <Button>
            <div className="flex items-center space-x-2">
              <PlusCircle size={22} />
              <p>Add Datasource</p>
            </div>
          </Button>
        </Link>
      </div>
      <DatasourceTable />
    </div>
  );
};

export default Datasource;
