import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { RiRobot2Fill } from "react-icons/ri";
import RemoveAIModelModal from "@/components/modals/RemoveAIModelModal";
import ChangeSubscriptionTierModal from "@/components/modals/ChangeSubscriptionTierModal";

interface AIModel {
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

const aiModels: AIModel[] = [
  {
    id: 1,
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description:
      "Most capable GPT-4 model, optimized for chat and traditional completions tasks",
    status: "Active",
    requestsToday: "14,230",
    avgLatency: "1.2s",
    usage: 78,
    subscriptionTier: "Enterprise",
    icon: <SiOpenai className="h-6 w-6" />,
    iconBg: "bg-emerald-500/10",
    gradientFrom: "from-blue-500",
    gradientTo: "to-pink-500",
  },
  {
    id: 2,
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description:
      "Most powerful model for highly complex tasks with extended context window",
    status: "Active",
    requestsToday: "8,940",
    avgLatency: "1.8s",
    usage: 45,
    subscriptionTier: "Pro",
    icon: <RiRobot2Fill className="h-6 w-6" />,
    iconBg: "bg-orange-500/10",
    gradientFrom: "from-blue-500",
    gradientTo: "to-pink-500",
  },
  {
    id: 3,
    name: "Gemini Ultra",
    provider: "Google",
    description:
      "Google's most capable AI model for highly complex tasks and multimodal reasoning",
    status: "Active",
    requestsToday: "19,820",
    avgLatency: "0.9s",
    usage: 92,
    subscriptionTier: "Enterprise",
    icon: <SiGoogle className="h-6 w-6" />,
    iconBg: "bg-blue-500/10",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
  },
];

export default function AIModels() {
  const [isChangeTierOpen, setIsChangeTierOpen] = useState(false);
  const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const activeCount = aiModels.filter((m) => m.status === "Active").length;
  const degradedCount = aiModels.filter((m) => m.status === "Degraded").length;

  const handleUpgrade = (model: AIModel) => {
    setSelectedModel(model);
    setIsChangeTierOpen(true);
  };

  const handleRemove = (model: AIModel) => {
    setSelectedModel(model);
    setIsRemoveModelOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            AI Model Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {aiModels.length} integrated models
          </p>
        </div>
        <div className="flex gap-2">
          {activeCount > 0 && (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
              {activeCount} Active
            </Badge>
          )}
          {degradedCount > 0 && (
            <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
              {degradedCount} Degraded
            </Badge>
          )}
        </div>
      </div>

      {/* AI Model Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {aiModels.map((model) => (
          <Card
            key={model.id}
            className="flex flex-col bg-card border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`rounded-lg ${model.iconBg} p-3 text-primary flex-shrink-0`}
                  >
                    {model.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground">
                      {model.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {model.provider}
                    </p>
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

              {/* Metrics */}
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

              {/* Usage Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Usage</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {model.usage}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${model.gradientFrom} ${model.gradientTo} rounded-full transition-all duration-500`}
                    style={{ width: `${model.usage}%` }}
                  />
                </div>
              </div>

              {/* Subscription Tier */}
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
                className="flex-1 text-[#4DC8FF] bg-[#4DC8FF1A] hover:bg-[#4DC8FF33] rounded-2xl  py-4"
                onClick={() => handleUpgrade(model)}
              >
                Upgrade
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-[#FFB300] bg-[#FFB30014] hover:bg-[#FFB3001A] rounded-2xl py-4"
                onClick={() => handleUpgrade(model)}
              >
                Downgrade
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 "
                onClick={() => handleRemove(model)}
              >
                <FaTrash className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <Dialog open={isChangeTierOpen} onOpenChange={setIsChangeTierOpen}>
        {selectedModel && (
          <ChangeSubscriptionTierModal
            model={selectedModel}
            onClose={() => setIsChangeTierOpen(false)}
          />
        )}
      </Dialog>

      <Dialog open={isRemoveModelOpen} onOpenChange={setIsRemoveModelOpen}>
        {selectedModel && (
          <RemoveAIModelModal
            model={selectedModel}
            onClose={() => setIsRemoveModelOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}
