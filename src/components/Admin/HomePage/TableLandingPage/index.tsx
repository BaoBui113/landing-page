"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { IGetLandingPageResponse } from "@/types/landingPage";
import ModalLandingPage from "../ModalLandingPage";
import { toast } from "react-toastify";
import { useDeleteLandingPage } from "@/services/landing-page";

export default function TableLandingPage({
  landingPageList,
}: {
  landingPageList: IGetLandingPageResponse[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataLandingPage, setDataLandingPage] = useState<IGetLandingPageResponse | undefined>(undefined)
  const { deleteLandingPage, isDeletingLandingPage } = useDeleteLandingPage();
  const handleDelete = (id: number) => {
    deleteLandingPage({ id }, {
      onSuccess: () => {
        toast.success("Delete success")
      }
    });
  };
  const handleOpenEdit = (row: IGetLandingPageResponse) => {
    onOpen();
    setDataLandingPage(row)
  };
  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>List domain</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Main Domain</TableColumn>
          <TableColumn>Telegram</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {landingPageList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name_page}</TableCell>
              <TableCell>{row.list_domain.join(', ')}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.domain_main_website}</TableCell>
              <TableCell>{row.telegram}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  onClick={() => handleOpenEdit(row)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Button>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold mb-1">{`Do you want delete ${row.name_page} ?`}</div>
                      <div className="flex justify-end mt-2">
                        <Button
                          onClick={() => handleDelete(row.id)}
                          isLoading={isDeletingLandingPage}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 w-6 h-8 rounded"
                        >
                          Success
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!!dataLandingPage && <ModalLandingPage dataLandingPage={dataLandingPage} isOpen={isOpen} onOpenChange={onOpenChange} />}

    </>
  );
}
