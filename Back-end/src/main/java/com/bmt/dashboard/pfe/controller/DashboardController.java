package com.bmt.dashboard.pfe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    // Dashboards
    @GetMapping("/dashboard")
    public String showDashboard() {
        return "index";
    }

    @GetMapping("/dashboard2")
    public String showDashboard2() {
        return "index2";
    }

    @GetMapping("/dashboard3")
    public String showDashboard3() {
        return "index3";
    }

    // Examples
    @GetMapping("/examples/login")
    public String showLogin() {
        return "examples/login";
    }

    @GetMapping("/examples/login-v2")
    public String showLoginV2() {
        return "examples/login-v2";
    }

    @GetMapping("/examples/register")
    public String showRegister() {
        return "examples/register";
    }

    @GetMapping("/examples/register-v2")
    public String showRegisterV2() {
        return "examples/register-v2";
    }

    @GetMapping("/examples/lockscreen")
    public String showLockscreen() {
        return "examples/lockscreen";
    }

    // Forms
    @GetMapping("/forms/general")
    public String showGeneralForms() {
        return "forms/general";
    }

    @GetMapping("/forms/advanced")
    public String showAdvancedForms() {
        return "forms/advanced";
    }

    @GetMapping("/forms/editors")
    public String showEditors() {
        return "forms/editors";
    }

    @GetMapping("/forms/validation")
    public String showValidation() {
        return "forms/validation";
    }

    // Tables
    @GetMapping("/tables/simple")
    public String showSimpleTable() {
        return "tables/simple";
    }

    @GetMapping("/tables/data")
    public String showDataTable() {
        return "tables/data";
    }

    // UI Elements
    @GetMapping("/UI/general")
    public String showUIGeneral() {
        return "UI/general";
    }

    @GetMapping("/UI/icons")
    public String showUIIcons() {
        return "UI/icons";
    }

    @GetMapping("/UI/buttons")
    public String showUIButtons() {
        return "UI/buttons";
    }

    // Widgets
    @GetMapping("/widgets")
    public String showWidgets() {
        return "widgets/index";
    }
}