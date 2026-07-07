import type { ReactNode } from "react";

interface AdminDataTableProps {
  title: string;
  createButtonLabel: string;
  headers: string[];
  onCreate: () => void;
  children: ReactNode;
}

function AdminDataTable({
  title,
  createButtonLabel,
  headers,
  onCreate,
  children,
}: AdminDataTableProps) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onCreate}
        >
          {createButtonLabel}
        </button>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDataTable;
