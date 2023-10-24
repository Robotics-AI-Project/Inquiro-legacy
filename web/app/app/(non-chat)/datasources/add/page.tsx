import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Create = (props: Props) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="font-bold text-5xl">Add Data Source</h1>
        <div className="flex justify-between items-start">
          <p className="w-[520px] font-light text-base">
            Connect to a data source or import its schema manually. Once you
            have added a data source, it will appear in this library.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold text-4xl">Connect to Database</h2>
        <div className="grid grid-cols-2 gap-8 w-[80%] h-72">
          <Link href={ROUTES.DATASOURCD_ADD_POSTGRES}>
            <Button
              variant="outline"
              className="flex-col w-full h-full border-2 text-3xl font-semibold border-background/10 space-y-4"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                alt="Postgres"
                width={120}
                height={120}
              />
              <p>Postgres</p>
            </Button>
          </Link>
          <Link href={ROUTES.DATASOURCD_ADD_SQLITE}>
            <Button
              variant="outline"
              className="flex-col w-full h-full border-2 text-3xl font-semibold border-background/10 space-y-4"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/97/Sqlite-square-icon.svg"
                alt="SQLite"
                height={120}
                width={120}
              />
              <p>SQLite</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
