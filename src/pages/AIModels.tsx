import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FaTrash, FaCheck } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import ChangeSubscriptionTierModal from "@/components/modals/ChangeSubscriptionTierModal";
import RemoveAIModelModal from "@/components/modals/RemoveAIModelModal";

interface AIModel {
  id: number;
  name: string;
  description: string;
  features: string[];
  status: string;
  price: string;
  scansPerMonth: number;
}

const aiModels: AIModel[] = [
  {
    id: 1,
    name: "GPT-4",
    description: "Most capable model, great for complex tasks",
    features: [
      "Advanced reasoning",
      "Code generation",
      "Long context window",
      "Multimodal support",
    ],
    status: "Active",
    price: "$20/month",
    scansPerMonth: 500,
  },
  {
    id: 2,
    name: "Claude 3 Opus",
    description: "Powerful AI assistant for professional work",
    features: [
      "Extended thinking",
      "Research & analysis",
      "Document processing",
      "Creative writing",
    ],
    status: "Active",
    price: "$25/month",
    scansPerMonth: 500,
  },
  {
    id: 3,
    name: "Gemini Pro",
    description: "Google's advanced AI model",
    features: [
      "Fast responses",
      "Broad knowledge",
      "Code assistance",
      "Data analysis",
    ],
    status: "Inactive",
    price: "$15/month",
    scansPerMonth: 300,
  },
  {
    id: 4,
    name: "LLaMA 3",
    description: "Open-source powerful language model",
    features: [
      "Cost-effective",
      "Customizable",
      "Privacy-focused",
      "Local deployment",
    ],
    status: "Active",
    price: "$10/month",
    scansPerMonth: 200,
  },
];

export default function AIModels() {
  const [isChangeTierOpen, setIsChangeTierOpen] = useState(false);
  const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Models</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {aiModels.map((model) => (
          <Card key={model.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <RiRobot2Fill className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{model.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {model.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={model.status === "Active" ? "default" : "secondary"}
                >
                  {model.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{model.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {model.scansPerMonth} scans per month
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Features:</p>
                  <ul className="space-y-2">
                    {model.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <FaCheck className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1" onClick={() => handleUpgrade(model)}>
                {model.status === "Active" ? "Manage" : "Upgrade"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemove(model)}
              >
                <FaTrash className="h-4 w-4 text-red-600" />
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
