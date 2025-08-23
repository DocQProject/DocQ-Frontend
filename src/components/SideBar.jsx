function SideBar({menus, activeSection, setActiveSection}) {
    return (
        <>
            <aside className="flex-shrink-0 flex flex-col gap-6">
                {menus.map((section) => (
                    <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`text-2xl font-semibold text-left px-3 transition-colors ${activeSection === section
                            ? "text-blue-600 border-r-4 border-blue-600 pl-4"
                            : "text-gray-700 hover:text-blue-600 pl-4"
                            }`}
                    >
                        {section}
                    </button>
                ))}
            </aside>
        </>
    );
}

export default SideBar;