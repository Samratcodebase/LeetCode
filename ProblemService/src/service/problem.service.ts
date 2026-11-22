import type {
  CreateProblemDto,
  UpdateProblemDto,
  ProblemResponseDto,
} from "../DTO/problem.dto";
import { IProblemRepository } from "../repository/problem.repository";
import { NotFoundError } from "../utils/errors/app.error";

export interface IProblemService {
  createProblem(problem: CreateProblemDto): Promise<ProblemResponseDto>;
  getAllProblems(): Promise<ProblemResponseDto[]>;
  getProblemById(id: string): Promise<ProblemResponseDto | null>;
  updateProblem(
    id: string,
    updateData: UpdateProblemDto,
  ): Promise<ProblemResponseDto | null>;
  deleteProblem(id: string): Promise<ProblemResponseDto | null>;
  findByDifficulty(
    difficulty: "easy" | "medium" | "hard",
  ): Promise<ProblemResponseDto[]>;
  searchProblems(title: string): Promise<ProblemResponseDto[]>;
}

export class problemService implements IProblemService {
  private problemRepository: IProblemRepository;

  constructor(problemRepo: IProblemRepository) {
    this.problemRepository = problemRepo;
  }

  async createProblem(problem: CreateProblemDto): Promise<ProblemResponseDto> {
    //Todo Do Mark Down Sanitization
    return await this.problemRepository.createProblem(problem);
  }

  async getAllProblems(): Promise<ProblemResponseDto[]> {
    await this.problemRepository.getAllProblems();

    return {};
  }
  async getProblemById(id: string): Promise<ProblemResponseDto | null> {
    return await this.problemRepository.getProblemById(id);
  }
  async updateProblem(
    id: string,
    updateData: UpdateProblemDto,
  ): Promise<ProblemResponseDto | null> {
    const problem = await this.problemRepository.getProblemById(id);

    if (!problem) {
      throw new NotFoundError("Problem not Found");
    }
    return await this.problemRepository.updateProblem(id, updateData);
  }

  async deleteProblem(id: string): Promise<ProblemResponseDto | null> {
    return await this.problemRepository.deleteProblem(id);
  }

  async findByDifficulty(
    difficulty: "easy" | "medium" | "hard",
  ): Promise<ProblemResponseDto[]> {
    return await this.problemRepository.findByDifficulty(difficulty);
  }

  async searchProblems(title: string): Promise<ProblemResponseDto[]> {
    return await this.problemRepository.searchProblems(title);
  }
}
