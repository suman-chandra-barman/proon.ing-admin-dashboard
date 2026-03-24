import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { RiRobot2Fill } from "react-icons/ri";
import RemoveAIModelModal from "@/components/modals/RemoveAIModelModal";
import ChangeSubscriptionTierModal from "@/components/modals/ChangeSubscriptionTierModal";
import AddAIModelModal from "@/components/modals/AddAIModelModal";
import type { AddAIModelFormData } from "@/components/modals/AddAIModelModal";
import AIModelCard from "@/components/cards/AIModelCard";

interface AIModel {
  id: number;
  name: string;
  provider: string;
  modelType: "Chat" | "Object Identification";
  description: string;
  apiKey: string;
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

const initialModels: AIModel[] = [
  {
    id: 1,
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    modelType: "Chat",
    description:
      "Most capable GPT-4 model, optimized for chat and traditional completions tasks",
    apiKey: "",
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
    modelType: "Chat",
    description:
      "Most powerful model for highly complex tasks with extended context window",
    apiKey: "",
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
    modelType: "Object Identification",
    description:
      "Google's most capable AI model for highly complex tasks and multimodal reasoning",
    apiKey: "",
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
  const [models, setModels] = useState<AIModel[]>(initialModels);
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [isChangeTierOpen, setIsChangeTierOpen] = useState(false);
  const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [activeTab, setActiveTab] = useState<
    "All Models" | "Chat Models" | "Object Detection Models"
  >("All Models");

  const getProviderVisuals = (provider: string) => {
    const normalized = provider.toLowerCase();

    if (normalized.includes("openai")) {
      return {
        icon: <SiOpenai className="h-6 w-6" />,
        iconBg: "bg-emerald-500/10",
        gradientFrom: "from-blue-500",
        gradientTo: "to-pink-500",
      };
    }

    if (normalized.includes("google") || normalized.includes("gemini")) {
      return {
        icon: <SiGoogle className="h-6 w-6" />,
        iconBg: "bg-blue-500/10",
        gradientFrom: "from-orange-500",
        gradientTo: "to-red-500",
      };
    }

    return {
      icon: <RiRobot2Fill className="h-6 w-6" />,
      iconBg: "bg-orange-500/10",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-indigo-500",
    };
  };

  const activeCount = models.filter((m) => m.status === "Active").length;
  const degradedCount = models.filter((m) => m.status === "Degraded").length;
  const objectModels = models.filter(
    (m) => m.modelType === "Object Identification",
  );

  const filteredModels =
    activeTab === "All Models"
      ? models
      : activeTab === "Chat Models"
        ? models.filter((m) => m.modelType === "Chat")
        : objectModels;

  const handleUpgrade = (modelId: number) => {
    const model = models.find((item) => item.id === modelId);
    if (!model) return;

    setSelectedModel(model);
    setIsChangeTierOpen(true);
  };

  const handleRemove = (modelId: number) => {
    const model = models.find((item) => item.id === modelId);
    if (!model) return;

    setSelectedModel(model);
    setIsRemoveModelOpen(true);
  };

  const handleConfirmRemove = () => {
    if (!selectedModel) return;

    setModels((current) =>
      current.filter((model) => model.id !== selectedModel.id),
    );
    setIsRemoveModelOpen(false);
    setSelectedModel(null);
  };

  const handleAddModel = (formData: AddAIModelFormData) => {
    const modelVisuals = getProviderVisuals(formData.provider);
    const nextId =
      models.length > 0 ? Math.max(...models.map((model) => model.id)) + 1 : 1;

    const newModel: AIModel = {
      id: nextId,
      name: formData.name,
      provider: formData.provider,
      modelType: formData.modelType,
      description: formData.description,
      apiKey: formData.apiKey,
      status: formData.status,
      requestsToday: "0",
      avgLatency: "-",
      usage: 0,
      subscriptionTier: formData.subscriptionTier,
      ...modelVisuals,
    };

    setModels((current) => [newModel, ...current]);
    setIsAddModelOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            AI Model Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {models.length} integrated models
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setIsAddModelOpen(true)}>Add Model</Button>
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

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 w-fit">
        {(
          ["All Models", "Chat Models", "Object Detection Models"] as const
        ).map((tab) => (
          <Button
            key={tab}
            type="button"
            variant={activeTab === tab ? "default" : "ghost"}
            className="rounded-lg"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{activeTab}</h2>
        <Badge variant="outline" className="text-xs">
          {filteredModels.length} models
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredModels.map((model) => (
          <AIModelCard
            key={model.id}
            model={model}
            onUpgrade={handleUpgrade}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No models found for this category.
        </div>
      )}

      {/* Modals:---- add ai model, change subscription tier, remove ai model */}
      <Dialog open={isAddModelOpen} onOpenChange={setIsAddModelOpen}>
        <AddAIModelModal
          onAdd={handleAddModel}
          onClose={() => setIsAddModelOpen(false)}
        />
      </Dialog>
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
            onConfirm={handleConfirmRemove}
            onClose={() => setIsRemoveModelOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}
