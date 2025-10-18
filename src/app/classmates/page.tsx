import { ClassmateList } from "@/components/classmates/classmate-list";
import { classmates } from "@/lib/data";

export default function ClassmatesPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Classmates</h1>
        <p className="text-muted-foreground">Find and challenge your friends.</p>
      </div>
      <ClassmateList classmates={classmates} />
    </div>
  );
}
