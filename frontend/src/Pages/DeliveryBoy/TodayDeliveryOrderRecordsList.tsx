
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'
interface records {
    data: any
}

const TodayDeliveryOrderRecordsList = ({ data }: records) => {
    return (
        <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
                <YAxis dataKey={"count"} allowDecimals={false} />
                <Tooltip
                    formatter={(value) => [value, 'orders']}
                    labelFormatter={(label) => `${label}:00`}
                />
                <Bar dataKey="count" fill='#ff4d3d' />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default TodayDeliveryOrderRecordsList