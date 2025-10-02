export default function DashboardCard({ title, value, children }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-500">{title}</h4>
            <div className="mt-2 text-2xl font-bold">{value}</div>
            {children}
        </div>
    )
}