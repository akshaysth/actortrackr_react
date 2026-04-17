import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/components/ui/data-table";

export interface ActionItem {
  label: string;
  to: string;
  icon: ReactNode;
  ariaLabel?: string;
  variant?: "ghost" | "default" | "secondary" | "destructive" | "outline" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  destructive?: boolean;
}

export function createTextColumn<T>(
  key: string,
  header: string,
  options?: {
    accessorKey?: string;
    isSortable?: boolean;
    width?: string;
    className?: string;
    headerClassName?: string;
  }
): Column<T> {
  return {
    key,
    header,
    accessorKey: options?.accessorKey || key,
    isSortable: options?.isSortable ?? true,
    width: options?.width,
    className: options?.className,
    headerClassName: options?.headerClassName,
  };
}

export function createActionColumn<T>(
  actions: ActionItem[],
  options?: { width?: string }
): Column<T> {
  return {
    key: "actions",
    header: "Actions",
    width: options?.width || "w-24",
    render: (_value: any, row: T) => (
      <div className="flex items-center gap-1">
        {actions.map((action, idx) =>
          action.to ? (
            <Link
              key={idx}
              to={action.to.replace(":id", String((row as any).id))}
              aria-label={action.ariaLabel || action.label}
            >
              <Button
                variant={action.destructive ? "destructive" : action.variant || "ghost"}
                size={action.size || "icon"}
                className={action.size === "icon" ? "size-8" : ""}
              >
                {action.icon}
              </Button>
            </Link>
          ) : null
        )}
      </div>
    ),
  };
}

export function createBadgeColumn<T>(
  key: string,
  header: string,
  colorFn: (value: any) => { variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" },
  options?: {
    accessorKey?: string;
    isSortable?: boolean;
    render?: (value: any, row: T) => ReactNode;
  }
): Column<T> {
  return {
    key,
    header,
    accessorKey: options?.accessorKey || key,
    isSortable: options?.isSortable ?? true,
    render: (value: any) => {
      if (options?.render) {
        return options.render(value, {} as T);
      }
      const { variant } = colorFn(value);
      return <Badge variant={variant}>{value ?? "—"}</Badge>;
    },
  };
}
