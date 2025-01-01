import ReportCard from "./_components/report-card";

export default function ReportingPage() {
  return (
    <div className="px-6 space-y-5">
      <div className="flex space-x-4">
        <ReportCard
          title="Plant Report"
          description="Select plants for comparison within a specific period and choose supplementary criteria."
          navigateTo="/admin/reporting/plant_report"
        />
        <ReportCard
          title="Statistics Report"
          description="The report details information regarding yield, installed power, revenue, and CO₂ reduction."
          navigateTo="/admin/reporting/statistics_report"
        />
      </div>
    </div>
  );
}
