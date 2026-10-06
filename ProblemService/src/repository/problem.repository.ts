import { Iproblem, Problem } from "../models/problem.model";

export interface IProblemRepository {
  createProblem(problem: Partial<Iproblem>): Promise<Iproblem>;
  getProblemById(id: string): Promise<Iproblem | null>;
  getAllProblems(): Promise<{ problems: Iproblem[]; totalCount: number }>;
  updateProblem(
    id: string,
    updateData: Partial<Iproblem>,
  ): Promise<Iproblem | null>;
  deleteProblem(id: string): Promise<Iproblem | null>;
  findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<Iproblem[]>;
  searchProblems(title: string): Promise<Iproblem[]>;
}

export class ProblemRepository implements IProblemRepository {
  async createProblem(problem: Partial<Iproblem>): Promise<Iproblem> {
    const newProblem = Problem.create(problem);

    return newProblem;
  }
  async getProblemById(id: string): Promise<Iproblem | null> {
    const problem = await Problem.findById(id);
    return problem;
  }

  async getAllProblems(): Promise<{
    problems: Iproblem[];
    totalCount: number;
  }> {
    const problems = await Problem.find();
    const totalCount = await Problem.countDocuments();
    return { problems, totalCount };
  }

  async updateProblem(
    id: string,
    updateData: Partial<Iproblem>,
  ): Promise<Iproblem | null> {
    const updatedProblem = await Problem.findOneAndUpdate(
      {
        _id: id,
        updateData,
      },
      { new: true },
    );

    return updatedProblem;
  }

  async deleteProblem(id: string): Promise<Iproblem | null> {
    const deletedProblem = await Problem.findOneAndDelete({ _id: id });
    return deletedProblem;
  }

  async findByDifficulty(
    difficulty: "easy" | "medium" | "hard",
  ): Promise<Iproblem[]> {
    const problems = await Problem.find({ difficulty: difficulty });
    return problems;
  }
  async searchProblems(title: string): Promise<Iproblem[]> {
    const problems = await Problem.find({ title: title });
    return problems;
  }
}
