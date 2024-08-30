import CadastroMedalhas from "views/CadastroMedalhas.js";
import CadastroUsuario from "views/CadastrarUsuario.js";
import QuadroMedalhas from "views/QuadroMedalhas.js";
import SeguirPaises from "views/SeguirPaises.js";
import Login from "views/Login.js";
import DetalharMedalhas from "views/DetalharMedalhas.js";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "fa fa-sign-in-alt", // Ícone de login
    component: <Login />,
    layout: "/admin",
  },
  {
    path: "/cadstrarUsuario",
    name: "Cadastrar Usuario",
    icon: "fa fa-user-plus", // Ícone de adicionar usuário
    component: <CadastroUsuario />,
    layout: "/admin",
  },
  {
    path: "/cadastroMedalhas",
    name: "Cadastro de Medalhas",
    icon: "fa fa-medal", // Ícone de medalhas
    component: <CadastroMedalhas />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Quadro de Medalhas",
    icon: "fa fa-trophy", // Ícone de troféu
    component: <QuadroMedalhas />,
    layout: "/admin",
  },
  {
    path: "/detalhadas",
    name: "Medalhas por País",
    icon: "fa fa-flag", // Ícone de bandeira
    component: <DetalharMedalhas />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Países ídolos",
    icon: "fa fa-star", // Ícone de estrela
    component: <SeguirPaises />,
    layout: "/admin",
  },
];

export default routes;