import mongoose, { Document } from "mongoose";

export interface ITestCase {
  input: string;
  output: string;
}

export interface Iproblem extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  createAt: Date;
  updateAt: Date;
  editorial?: string;
  testCase: ITestCase[];
}
const TestCaseSchema = new mongoose.Schema<ITestCase>(
  {
    input: {
      type: String,
      required: [true, "Input is required"],
      trim: true,
    },
    output: {
      type: String,
      required: [true, "Output is required"],
      trim: true,
    },
  },
  // , {_id: false}  //This is Not Generating _id for subdocument, but it is not working as expected
);

const ProblemSchema = new mongoose.Schema<Iproblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "{VALUE} is not a valid difficulty",
      },
      default: "easy",
      required: [true, "Difficulty is required"],
    },

    editorial: {
      type: String,
      trim: true,
    },
    testCase: [TestCaseSchema],
  },
  { timestamps: true },
);

ProblemSchema.index({ title: 1, difficulty: 1 }, { unique: true });
export const Problem = mongoose.model<Iproblem>("Problem", ProblemSchema);

//Generate a commit message for this code change: "Add Problem and TestCase models with validation and indexing"