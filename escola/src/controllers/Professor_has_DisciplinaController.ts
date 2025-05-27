// Arquivo: src/controllers/Professor_has_DisciplinaController.ts
import { Request, Response } from "express";
import { Professor_has_Disciplina } from "../models";

class Professor_has_DisciplinaController {
  public async create(req: Request, res: Response): Promise<void> {
    // Corrigido para Promise<void>
    const { professor, disciplina } = req.body;
    try {
      const document = new Professor_has_Disciplina({ professor, disciplina });
      const response = await document.save();
      res.json(response); // Sem 'return'
    } catch (error: any) {
      if (error && error.errors["professor"]) {
        res.json({ message: error.errors["professor"].message });
      } else if (error && error.errors["disciplina"]) {
        res.json({ message: error.errors["disciplina"].message });
      } else {
        res.json({ message: error.message });
      }
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    // Corrigido para Promise<void>
    try {
      const objects = await Professor_has_Disciplina.find()
        .populate("professor")
        .populate("disciplina")
        .select("professor disciplina")
        .sort({ nome: "asc" });
      res.json(objects); // Sem 'return'
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    // Corrigido para Promise<void>
    const { id: _id } = req.body;
    try {
      const object = await Professor_has_Disciplina.findByIdAndDelete(_id);
      if (object) {
        res.json({ message: "Registro excluído com sucesso" });
      } else {
        res.json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    // Corrigido para Promise<void>
    const { id, professor, disciplina } = req.body;
    try {
      const document = await Professor_has_Disciplina.findById(id);
      if (!document) {
        res.json({ message: "Registro inexistente!" });
        return; // Adicione return para evitar execução adicional
      }
      document.professor = professor;
      document.disciplina = disciplina;
      const response = await document.save();
      res.json(response); // Sem 'return'
    } catch (error: any) {
      if (error && error.errors["professor"]) {
        res.json({ message: error.errors["professor"].message });
      } else if (error && error.errors["disciplina"]) {
        res.json({ message: error.errors["disciplina"].message });
      } else {
        res.json({ message: error.message });
      }
    }
  }
}

export default new Professor_has_DisciplinaController(); // Exportação correta
