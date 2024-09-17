const roles = {
    admin: ['manage_all'], // Full access to all operations
    principal: [
        'manage_school',
        'make_policy',
        'decision_making',
        'manage_staff'
    ],
    vicePrincipal: [
        'assist_principal',
        'oversee_academics',
        'oversee_discipline'
    ],
    administrativeStaff: [
        'handle_clerical_tasks',
        'manage_communication',
        'schedule_activities',
        'coordinate_school_activities'
    ],

    classTeacher: [
        'mark_register',
        'add_learner',
        'manage_discipline',
        'release_learner',
        'view_class_timetable',
        'borrow_books'
    ],
    teachingStaff: [
        'manage_discipline',
        'borrow_books'
    ],
    departmentHead: [
        'develop_curriculum',
        'support_teachers',
        'manage_department'
    ],
    teacher: [
        'conduct_instruction',
        'grade_students',
        'support_students',
        'manage_classroom'
    ],
    teachingAssistant: [
        'support_teaching',
        'assist_classroom_management'
    ],

    guidanceCounselor: [
        'provide_academic_counseling',
        'provide_career_counseling',
        'provide_personal_counseling'
    ],
    specialEducationTeacher: [
        'support_special_needs_students',
        'assist_learning_disabilities'
    ],
    schoolNurse: [
        'manage_health_issues',
        'conduct_health_screenings',
        'provide_first_aid'
    ],

    itDirector: [
        'manage_tech_infrastructure',
        'oversee_it_staff',
        'implement_tech_policies'
    ],
    itSupportStaff: [
        'maintain_computers',
        'support_networks',
        'assist_educational_software'
    ],
    librarian: [
        'manage_library_resources',
        'support_research',
        'assist_media_usage'
    ],
    facilitiesManager: [
        'oversee_maintenance',
        'manage_repairs',
        'ensure_safety'
    ],
    custodialStaff: [
        'clean_buildings',
        'maintain_grounds'
    ],

    athleticDirector: [
        'manage_sports_teams',
        'organize_competitions',
        'oversee_physical_education'
    ],
    coach: [
        'train_athletes',
        'organize_practices',
        'manage_games'
    ],
    clubAdvisor: [
        'oversee_student_clubs',
        'mentor_extracurricular_activities'
    ],

    financeDirector: [
        'manage_budget',
        'process_payroll',
        'handle_financial_transactions'
    ],
    accountant: [
        'maintain_financial_records',
        'assist_budgeting',
        'prepare_financial_reports'
    ],
    hrDirector: [
        'oversee_recruitment',
        'manage_hiring',
        'handle_employee_relations'
    ],
    hrStaff: [
        'manage_employee_records',
        'process_benefits',
        'ensure_compliance'
    ],
    cafeteriaManager: [
        'oversee_meal_services',
        'manage_cafeteria_staff'
    ],
    cafeteriaStaff: [
        'prepare_meals',
        'serve_meals',
        'maintain_kitchen_hygiene'
    ],

    publicRelationsOfficer: [
        'manage_communication',
        'handle_community_relations',
        'manage_media_interactions'
    ],
    ptaMember: [
        'collaborate_with_parents',
        'organize_events',
        'conduct_fundraising'
    ],

    securityDirector: [
        'oversee_safety_policies',
        'manage_security_staff'
    ],
    securityGuard: [
        'ensure_safety',
        'protect_students',
        'guard_property'
    ],

    transportationDirector: [
        'manage_buses',
        'oversee_transport_logistics'
    ],
    busDriver: [
        'transport_students',
        'ensure_safe_travel'
    ],
    transportationCoordinator: [
        'schedule_routes',
        'maintain_transport_records',
        'communicate_with_parents'
    ],

    student: [
        'view_timetable',
        'submit_assignments',
        'view_grades',
        'participate_discussions',
        'borrow_books'
    ],
    parent: [
        'view_child_grades',
        'view_attendance',
        'view_reports',
        'communicate_with_teachers'
    ],
    guest: [
        'view_open_resources',
        'observe_classes'
    ]
};

module.exports = roles