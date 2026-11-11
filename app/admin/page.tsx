import { AdminView } from "@/components/pages/AdminView";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Admin", "Back office", "/admin/", true);

export default function AdminPage() {
  return <AdminView />;
}
