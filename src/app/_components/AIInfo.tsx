import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DisplayAIinfo() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-base">AI Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-2 flex items-center justify-center">
        <div className="text-center text-sm text-gray-500">
          <p>Analysis content will appear here</p>
        </div>
      </CardContent>
    </Card>
  );
}
