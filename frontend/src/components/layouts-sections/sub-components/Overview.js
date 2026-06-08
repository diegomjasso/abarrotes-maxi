import React from "react";

import {
    ShoppingCart,
    UserRound,
    Percent,
    History,
    DollarSign,
    Receipt,
    Package,
} from "lucide-react";

import "./Overview.scss";

const OverviewSidebar = ({
    userName = "Diego",
}) => {

    return (
        <div className="overview-sidebar">
            <div className="overview-header">
                <h4>
                    Bienvenido {userName} 👋
                </h4>
                <div className="overview-status">
                    <span className="status-dot" />
                    <span>
                        Caja abierta
                    </span>
                </div>
                <p>
                    Turno: Mañana
                </p>
            </div>
            <div className="overview-section">
                <h5>
                    Resumen del día
                </h5>
                <div className="overview-stats">
                    <div className="overview-stat-card">
                        <div className="stat-icon">
                            <DollarSign size={18} />
                        </div>
                        <div>
                            <span>
                                Ventas hoy
                            </span>
                            <strong>
                                $4,580.00
                            </strong>
                        </div>
                    </div>
                    <div className="overview-stat-card">
                        <div className="stat-icon">
                            <Receipt size={18} />
                        </div>
                        <div>
                            <span>
                                Tickets
                            </span>
                            <strong>
                                28
                            </strong>
                        </div>
                    </div>
                    <div className="overview-stat-card">
                        <div className="stat-icon">
                            <Package size={18} />
                        </div>
                        <div>
                            <span>
                                Productos vendidos
                            </span>
                            <strong>
                                124
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overview-section">
                <h5>
                    Acciones rápidas
                </h5>
                <div className="overview-actions">
                    <button>
                        <ShoppingCart size={18} />
                        <div>
                            <strong>
                                Ver carrito
                            </strong>
                            <span>
                                Ver productos agregados
                            </span>
                        </div>
                    </button>
                    <button>
                        <UserRound size={18} />
                        <div>
                            <strong>
                                Buscar cliente
                            </strong>
                            <span>
                                Buscar o crear cliente
                            </span>
                        </div>
                    </button>
                    <button>
                        <Percent size={18} />
                        <div>
                            <strong>
                                Aplicar descuento
                            </strong>
                            <span>
                                Agregar descuento
                            </span>
                        </div>
                    </button>
                    <button>
                        <History size={18} />
                        <div>
                            <strong>
                                Historial de ventas
                            </strong>
                            <span>
                                Ver ventas recientes
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default OverviewSidebar;