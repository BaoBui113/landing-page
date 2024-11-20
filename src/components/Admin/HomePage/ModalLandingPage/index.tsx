import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IGetLandingPageResponse } from "@/types/landingPage";
import { toast } from "react-toastify";
import { useCreateLandingPage, useEditLandingPage } from "@/services/landing-page";
interface FormValues {
  telegram: string;
  list_domain: { value: string }[];
  domain_main_website: string;
  description: string;
  name_page: string;
}

const schema = yup.object().shape({
  telegram: yup.string().optional().default(""),
  list_domain: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("Content list domain is a value"),
      })
    )
    .default([]),

  domain_main_website: yup.string().required("Doamin website is require"),
  description: yup.string().default(""),
  name_page: yup.string().required("Required"),
});

export default function ModalLandingPage({
  isOpen,
  onOpenChange,
  dataLandingPage,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dataLandingPage?: IGetLandingPageResponse;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { createLandingPage, isCreatingLandingPage } = useCreateLandingPage();
  const { editLandingPage, isUpdatingLandingPage } = useEditLandingPage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list_domain",
  });
  const onSubmit = (data: FormValues) => {
    const customData = {
      ...data,
      list_domain: data.list_domain?.map((item) => item.value) ?? [],
    };
    if (!!dataLandingPage) {
      editLandingPage(
        { id: dataLandingPage.id, data: customData },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
            toast.success("Edit success");
          },
        }
      );
    } else {
      createLandingPage(
        {
          data: customData,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            toast.success("Create success");
            reset();
          },
        }
      );
    }
  };

  useEffect(() => {
    setValue("telegram", dataLandingPage?.telegram ?? "");
    setValue("description", dataLandingPage?.description ?? "");
    setValue("domain_main_website", dataLandingPage?.domain_main_website ?? "");
    setValue("name_page", dataLandingPage?.name_page ?? "");
    setValue(
      "list_domain",
      dataLandingPage?.list_domain?.map((item) => ({ value: item })) ?? [
        { value: "" },
      ]
    );
  }, [dataLandingPage, setValue]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {dataLandingPage ? "Edit Landing Page" : "Post Landing Page"}
            </ModalHeader>
            <ModalBody>
              <Controller
                name="name_page"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <Input
                      {...field}
                      label="Page Name"
                      placeholder="Enter page name"
                    />
                    {errors.name_page?.message && (
                      <span className="text-xs text-red-500 ml-3">
                        {errors.name_page.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="domain_main_website"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <Input
                      {...field}
                      label="Main Website Domain"
                      placeholder="Enter main website domain"
                    />
                    {errors.domain_main_website?.message && (
                      <span className="text-xs text-red-500 ml-3">
                        {errors.domain_main_website.message}
                      </span>
                    )}
                  </div>
                )}
              />

              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Controller
                    name={`list_domain.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col w-full">
                        <Input
                          {...field}
                          label={`Domain ${index + 1}`}
                          placeholder="Enter domain"
                        />
                        {errors.list_domain?.[index]?.value?.message && (
                          <span className="text-xs text-red-500 ml-3">
                            {errors.list_domain?.[index]?.value?.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                  <Button
                    onPress={() => remove(index)}
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onPress={() => append({ value: "" })}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Domain
              </Button>
              <Controller
                name="telegram"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <Input
                      {...field}
                      label="Telegram"
                      placeholder="Enter telegram email"
                    />
                  </div>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <Input
                      {...field}
                      label="Description"
                      placeholder="Enter description"
                    />
                  </div>
                )}
              />
              {!!dataLandingPage && (
                <Input
                  value={dataLandingPage?.api_key}
                  isDisabled
                  label="Api Key"
                  placeholder="Enter Api Key"
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={isCreatingLandingPage || isUpdatingLandingPage}
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
