// controllers/module.controller.js
// Controlador para manejo de módulos y activación por empresa.

import { ModuleModel } from "../model/module.model.js";
import { CompanyModuleModel } from "../model/companyModule.model.js";

/**
 * Crear un módulo (admin del sistema)
 * body: { key_name, name, parent_id, description }
 */
export const createModule = async (req, res) => {
  try {
    const id = await ModuleModel.create(req.body);
    res.status(201).json({ message: "Módulo creado", module_id: id });
  } catch (err) {
    res.status(500).json({ message: "Error creando módulo", details: err.message });
  }
};

/**
 * Listar módulos. Query optional: ?onlyRoots=1
 */
export const listModules = async (req, res) => {
  try {
    const onlyRoots = req.query.onlyRoots === "1" || req.query.onlyRoots === "true";
    const modules = await ModuleModel.findAll({ onlyRoots });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: "Error listando módulos", details: err.message });
  }
};

/**
 * Obtener módulo por id
 */
export const getModuleById = async (req, res) => {
  try {
    const module = await ModuleModel.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Módulo no encontrado" });
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo módulo", details: err.message });
  }
};

/**
 * Actualizar módulo
 */
export const updateModule = async (req, res) => {
  try {
    await ModuleModel.update(req.params.id, req.body);
    res.json({ message: "Módulo actualizado" });
  } catch (err) {
    res.status(500).json({ message: "Error actualizando módulo", details: err.message });
  }
};

/**
 * Eliminar módulo
 */
export const deleteModule = async (req, res) => {
  try {
    await ModuleModel.delete(req.params.id);
    res.json({ message: "Módulo eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error eliminando módulo", details: err.message });
  }
};

/**
 * Activar módulo para una empresa
 * body: { company_id, module_id }
 */
export const activateModuleForCompany = async (req, res) => {
  try {
    const { company_id, module_id } = req.body;
    if (!company_id || !module_id) return res.status(400).json({ message: "company_id y module_id son requeridos" });

    const id = await CompanyModuleModel.activate(company_id, module_id);
    res.json({ message: "Módulo activado para empresa", company_module_id: id });
  } catch (err) {
    res.status(500).json({ message: "Error activando módulo", details: err.message });
  }
};

/**
 * Desactivar módulo para una empresa
 * body: { company_id, module_id }
 */
export const deactivateModuleForCompany = async (req, res) => {
  try {
    const { company_id, module_id } = req.body;
    if (!company_id || !module_id) return res.status(400).json({ message: "company_id y module_id son requeridos" });

    await CompanyModuleModel.deactivate(company_id, module_id);
    res.json({ message: "Módulo desactivado para empresa" });
  } catch (err) {
    res.status(500).json({ message: "Error desactivando módulo", details: err.message });
  }
};

/**
 * Listar módulos activados por empresa
 * GET /company/:company_id/modules
 */
export const listModulesByCompany = async (req, res) => {
  try {
    const company_id = req.params.company_id;
    const rows = await CompanyModuleModel.listByCompany(company_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error listando módulos por empresa", details: err.message });
  }
};
