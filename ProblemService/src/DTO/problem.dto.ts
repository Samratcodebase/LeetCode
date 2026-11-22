
import type { IProblemBase } from "../models/problem.model";

export type CreateProblemDto = Pick<
  IProblemBase,
  "title" | "description" | "difficulty" | "editorial" | "testCase"
>;

export type UpdateProblemDto = Partial<CreateProblemDto>;

export type ProblemResponseDto = IProblemBase;
