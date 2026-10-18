import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 트랙별 노출 순서. 숫자가 작을수록 앞. null이면 해당 트랙에서 숨김.
const order = z.number().nullable();

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),                       // 목록·상세 상단 한 줄
    period: z.string(),                        // "2024.04 – 2024.07"
    kind: z.enum(['실무', '개인 프로젝트', '팀 프로젝트']),
    org: z.string().optional(),                // 소속/맥락
    team: z.string().optional(),               // "6인 팀"
    role: z.string(),
    domain: z.string().optional(),
    order: z.object({ all: order, ax: order, da: order, dae: order }),
    metrics: z.array(z.object({
      value: z.string(),                       // 표시값 (countTo가 있으면 애니메이션 후 이 값과 동일해야 함)
      countTo: z.number().optional(),
      suffix: z.string().optional(),
      label: z.string(),
    })).default([]),
    tldr: z.array(z.string()),                 // 30초 요약 (3줄 권장)
    flow: z.array(z.string()).default([]),     // 처리 흐름 다이어그램
    stack: z.array(z.string()).default([]),
    askMe: z.array(z.string()).default([]),    // "이 프로젝트에 대해 물어봐 주세요"
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

export const collections = { work };
