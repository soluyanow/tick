<?php
/**
 * Ядро системы. Регистрирует классы системы
 *
 */
class Main
{
    /**
     * Инициализирует систему, подключает классы, использует класс Autoloader.
     *
     * @return bool true если классы добавлены, false - если ни один класс не зарегистрирован
     */
    public function Init()
    {
        $classPath = $_SERVER["DOCUMENT_ROOT"]."/core";

        $autoload = new Autoloader();
        spl_autoload_register(array($autoload, "autoload"));

        $modules = array_diff(scandir($classPath), array('..', '.', 'Main.class.php', 'Init.php'));

        $returnVal = false;

        foreach ($modules as $module) {
            $className = explode(".",$module)[0];
            $autoload->registerClass($className, $classPath."/".$module);

            $returnVal = true;
        }

        return $returnVal;
    }

    /**
     * Отображение интерфейса системы
     */
    public function showSystem()
    {
        $viewObject = new View();
        $viewObject->showInterface();
    }
}

/**
 * Класс для подключения классов в соответствии с PSR-4
 */
class Autoloader
{
    /**
     * @var array $classes - массив классов системы
     */
    protected $classes = array();

    /**
     * Регистрирует класс в системе
     *
     * @param string $className имя класса
     * @param string $classPath путь к файлу класса
     *
     * @return bool true - если класс зарегистрирован
     */
    public function registerClass($className, $classPath)
    {
        if (file_exists($classPath)) {
            $this->classes[$className] = $classPath;
            return true;
        }

        return false;
    }

    /**
     * Автозагрузка классов
     *
     * @param string $className имя класса
     *
     * @return bool true
     */
    public function autoload($className)
    {
        if (!empty($this->classes[$className])) {
            require_once($this->classes[$className]);
            return true;
        }

        return false;
    }
}
