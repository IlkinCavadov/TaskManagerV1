"use client";

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useTasks } from "@/context/taskContext";
// Get today's date information
const today = new Date()
const month = today.toLocaleString("default", { month: "long" })
const day = today.getDate()
const year = today.getFullYear()

// Sample data for the radial chart


const chartConfig = {
  completed: {
    label: "Completed",
    color: "#27F5D6",
  },
  pending: {
    label: "Pending",
    color: "#F58E27",
  },
} satisfies ChartConfig

function RadialChart() {
  const {tasks, completedTasks, activeTasks} = useTasks()
  const totalCompleted = completedTasks.length;
  const totalActive = activeTasks.length



  const chartData = [{ month: month, completed: totalCompleted, pending: totalActive }]

  const totalTasks = tasks.length;
  
  const percentage = Math.round((totalCompleted / totalTasks) * 100)




  return (
    <Card className="flex flex-col border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Activity</CardTitle>    
        <CardDescription>{day} {month} {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-62.5"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalTasks}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="#27F5D6"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill="#F58E27"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          You completed {percentage}% tasks this month
        </div>
      </CardFooter>
    </Card>
  )
}
export default RadialChart