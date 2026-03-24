import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

interface AIModelCardData {
  id: number;
  name: string;
  provider: string;
  description: string;
  status: "Active" | "Degraded" | "Inactive";
  requestsToday: string;
  avgLatency: string;
  usage: number;
  subscriptionTier: string;
  icon: React.ReactElement;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
}

interface AIModelCardProps {
  model: AIModelCardData;
  onUpgrade: (modelId: number) => void;
  onRemove: (modelId: number) => void;
}

export default function AIModelCard({
  model,
  onUpgrade,
  onRemove,
}: AIModelCardProps) {
  return (
    <Card className="flex flex-col bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`rounded-lg ${model.iconBg} p-3 text-primary shrink-0`}
            >
              {model.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground">
                {model.name}
              </h3>
              <p className="text-xs text-muted-foreground">{model.provider}</p>
            </div>
          </div>
          <Badge
            variant={model.status === "Active" ? "default" : "secondary"}
            className={
              model.status === "Active"
                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                : model.status === "Degraded"
                  ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
                  : "bg-gray-500/10 text-gray-500"
            }
          >
            {model.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {model.description}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center bg-gray-700 p-2 rounded-xl">
            <p className="text-xs text-muted-foreground">Req/Today</p>
            <p className="text-base font-semibold text-foreground mt-1">
              {model.requestsToday}
            </p>
          </div>
          <div className="text-center bg-gray-700 p-2 rounded-xl">
            <p className="text-xs text-muted-foreground">Avg Latency</p>
            <p className="text-base font-semibold text-foreground mt-1">
              {model.avgLatency}
            </p>
          </div>
          <div className="text-center bg-gray-700 p-2 rounded-xl">
            <p className="text-xs text-muted-foreground">Usage</p>
            <p className="text-base font-semibold text-foreground mt-1">
              {model.usage}%
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Usage</span>
            <span className="text-xs text-muted-foreground ml-2">
              {model.usage}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${model.gradientFrom} ${model.gradientTo} rounded-full transition-all duration-500`}
              style={{ width: `${model.usage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-muted-foreground">Current Subscription</span>
          <Badge
            variant="outline"
            className="bg-primary/5 text-primary border-primary/20"
          >
            {model.subscriptionTier}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[#4DC8FF] bg-[#4DC8FF1A] hover:bg-[#4DC8FF33] rounded-2xl py-4"
          onClick={() => onUpgrade(model.id)}
        >
          Upgrade
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[#FFB300] bg-[#FFB30014] hover:bg-[#FFB3001A] rounded-2xl py-4"
          onClick={() => onUpgrade(model.id)}
        >
          Downgrade
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => onRemove(model.id)}
        >
          <FaTrash className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
}
