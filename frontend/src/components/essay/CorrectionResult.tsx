import { EssayCorrectionResponse } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, BookOpen, Layout } from 'lucide-react';

interface Props {
  result: EssayCorrectionResponse;
}

export default function CorrectionResult({ result }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>批改结果</CardTitle>
          <Badge className={`${getScoreColor(result.score)} text-white text-lg px-4 py-2`}>
            {result.score}分
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="grammar">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grammar">语法错误</TabsTrigger>
            <TabsTrigger value="vocabulary">词汇</TabsTrigger>
            <TabsTrigger value="structure">结构</TabsTrigger>
            <TabsTrigger value="corrected">修改版</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grammar" className="space-y-4">
            {result.grammar_errors.length > 0 ? (
              result.grammar_errors.map((error, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <span>{error}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>没有发现语法错误，继续保持！</span>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="vocabulary">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-blue-500 mt-1" />
              <p className="leading-relaxed">{result.vocabulary_feedback}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="structure">
            <div className="flex items-start gap-3">
              <Layout className="h-5 w-5 text-purple-500 mt-1" />
              <p className="leading-relaxed">{result.structure_feedback}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="corrected">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap leading-relaxed">
                {result.corrected_version}
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">总体评价</h4>
          <p className="text-gray-700">{result.overall_feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}
