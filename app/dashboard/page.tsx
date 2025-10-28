"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import moment from "moment";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Plus,
  CircleCheck,
  ClockHour2,
  Circle,
  AlertCircle,
} from "tabler-icons-react";
import TaskTable from "./components/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ThemeProvider, theme } from "reablocks";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typograph";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { useSignOut } from "@/hooks/use-auth";
import {
  useCreateTask,
  useDeleteTask,
  useSummaryTask,
  useTasks,
  useUpdateTask,
} from "@/hooks/use-task";
import type { TaskRequest, TaskResponse, TaskStatus } from "@/types";
// import { TaskParams } from "@/hooks/use-task";
import { useChatStore } from "@/store/sidebar";
import { debounce } from "@/lib/utils";

const statusOptions: TaskStatus[] = ["todo", "in_progress", "done"];
type FormType = "create" | "edit";

const translateStatus: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const statusIcon = (
  size: number = 32
): Record<TaskStatus, React.JSX.Element> => {
  return {
    todo: <Circle size={size} className="inline-block mr-2" />,
    in_progress: <ClockHour2 size={size} className="inline-block mr-2" />,
    done: <CircleCheck size={size} className="inline-block mr-2" />,
  };
};

export default function DataTableDemo() {
  const now = moment();
  const signOut = useSignOut();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [formState, setFormState] = React.useState<FormType>("create");
  const [selectedRow, setSelectedRow] = React.useState<TaskResponse | null>(
    null
  );
  const form = useForm<TaskRequest>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isOpenDeleteKonfirmation, setIsOpenDeleteConfirmation] =
    React.useState(false);
  const [isOpenDialogForm, setIsOpenDialogForm] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<
    TaskStatus[] | undefined
  >(undefined);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TaskResponse>[] = [
    {
      accessorKey: "task_id",
      header: "Task ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("task_id")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }) => (
        <div className="">
          {statusIcon(14)[row.getValue("status") as TaskStatus]}
          {translateStatus[row.getValue("status") as TaskResponse["status"]]}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          {now >= moment(row.getValue("due_date")) && (
            <AlertCircle size={18} color="red" />
          )}
          <p
            className={
              now >= moment(row.getValue("due_date")) ? "text-red-600" : ""
            }
          >
            {row.getValue("due_date")}
          </p>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.task_id)}
              >
                Copy Task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRow(row.original);
                  setFormState("edit");
                  setIsOpenDialogForm(true);
                  // form.setValue("task_id", row.original.task_id);
                  form.setValue("title", row.original.title);
                  form.setValue("description", row.original.description);
                  form.setValue("due_date", row.original.due_date);
                  form.setValue("status", row.original.status);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600 focus:text-red-600"
                onClick={() => {
                  setSelectedRow(row.original);
                  setIsOpenDeleteConfirmation(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const deleteTask = useDeleteTask();

  const { aiSuggestionContentSelected, setSelectedSuggestion } = useChatStore();

  React.useEffect(() => {
    if (formState === "create" && !createTask.isPending) {
      form.setValue("title", aiSuggestionContentSelected.title);
      form.setValue("description", aiSuggestionContentSelected.description);
    }
  }, [
    aiSuggestionContentSelected,
    createTask.isPending,
    form,
    formState,
    updateTask.isPending,
  ]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: taskData } = useTasks(columnFilters, pagination);
  const data = taskData?.data ?? [];

  const { data: taskSummary, isSuccess: isFetchSummarySuccess } =
    useSummaryTask();

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: Math.ceil((taskData?.meta?.total ?? 0) / pagination.pageSize),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const handleFilter = React.useMemo(
    () =>
      debounce((value: string) => {
        table.getColumn("title")?.setFilterValue(value);
      }, 500), // delay 500ms
    [table]
  );

  const onSubmit = (data: TaskRequest) => {
    console.log("Form submitted with data:", data);
    console.log("Current form state:", formState);
    if (formState === "edit" && selectedRow) {
      updateTask.mutate(
        { id: selectedRow.id, body: data },
        {
          onSuccess: () => {
            setIsOpenDialogForm(false);
          },
        }
      );
    }

    if (formState === "create") {
      createTask.mutate(data, {
        onSuccess: () => {
          setIsOpenDialogForm(false);
        },
      });
    }
  };
  const handleLogOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        // Force a full page reload to clear all state
        window.location.replace("/auth/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
        // Even if logout fails, redirect to login
        window.location.replace("/auth/login");
      },
    });
  };

  const handleDeleteTasks = (id: string) => {
    deleteTask.mutate(id, {
      onSuccess: () => {
        setIsOpenDeleteConfirmation(false);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full">
        <div className=""></div>
        <div className="flex justify-between mb-5">
          <div>
            <TypographyH1>All Your Tasks, in One Place</TypographyH1>
            <TypographyP>
              Capture, plan, and complete your work with clarity and ease — no
              distractions, no clutter.
            </TypographyP>
          </div>
          <div className="flex flex-row flex-wrap items-center">
            <Button variant="link" onClick={handleLogOut}>
              Log Out
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex gap-3 sm-w-full lg-w-2/3">
          {statusOptions.map((status) => {
            return (
              <Card className="w-full" key={status}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{translateStatus[status]}</CardTitle>
                    {statusIcon(32)[status]}
                  </div>
                  <h2 className="text-2xl">
                    {isFetchSummarySuccess
                      ? taskSummary[status]?.data?.length
                      : ""}{" "}
                    Tasks
                  </h2>
                </CardHeader>
              </Card>
            );
          })}
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter tasks..."
            onChange={(event) => handleFilter(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="btn">
              <Button variant="outline" className="ml-2">
                <Plus /> Status{" "}
                {statusFilter?.length ? `(${statusFilter.length})` : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  checked={statusFilter?.includes(status) ?? false}
                  onCheckedChange={(value) => {
                    if (value) {
                      const newFilter = [status];
                      setStatusFilter(newFilter);
                      table.getColumn("status")?.setFilterValue(newFilter);
                    } else {
                      const newFilter = statusFilter?.filter(
                        (s) => s !== status
                      );
                      setStatusFilter(newFilter);
                      table
                        .getColumn("status")
                        ?.setFilterValue(newFilter ?? []);
                    }
                  }}
                >
                  {translateStatus[status]}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center"
                onClick={() => {
                  setStatusFilter([]);
                  table.getColumn("status")?.setFilterValue([]);
                }}
              >
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="ml-2 bg"
            variant="default"
            onClick={() => {
              setFormState("create");
              setIsOpenDialogForm(true);
              // form.setValue("task_id", "");
              form.setValue("title", "");
              form.setValue("description", "");
              form.setValue("due_date", "");
              form.setValue("status", "todo");
            }}
          >
            Add
          </Button>
        </div>
        <TaskTable table={table} />
        <AlertDialog
          open={isOpenDeleteKonfirmation}
          onOpenChange={setIsOpenDeleteConfirmation}
        >
          <AlertDialogTrigger asChild>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpenDeleteConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteTasks(selectedRow!.id)}
                disabled={deleteTask.isPending}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isOpenDialogForm} onOpenChange={setIsOpenDialogForm}>
          <AlertDialogTrigger asChild>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {formState === "create" ? "Create Task" : "Edit Task"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  disabled={createTask.isPending || updateTask.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type your Title here."
                          {...field}
                          type="text"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  disabled={createTask.isPending || updateTask.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            createTask.isPending || updateTask.isPending
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Options" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {translateStatus[status]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  disabled={createTask.isPending || updateTask.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          required
                          placeholder="Type your message here."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  disabled={createTask.isPending || updateTask.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YYYY-MM-DD"
                          {...field}
                          type="date"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {JSON.stringify(createTask.isError) !== "false" && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {createTask?.error?.message || "Registration failed"}
                  </div>
                )}
                {JSON.stringify(updateTask.isError) !== "false" && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {updateTask?.error?.message || "Registration failed"}
                  </div>
                )}
                <div className="flex justify-end">
                  <div>
                    <Button
                      variant="outline"
                      className=""
                      disabled={createTask.isPending || updateTask.isPending}
                      type="button"
                      onClick={() => {
                        setIsOpenDialogForm(false);
                        setSelectedSuggestion({ title: "", description: "" });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      className="ml-2"
                      disabled={createTask.isPending || updateTask.isPending}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ThemeProvider>
  );
}
