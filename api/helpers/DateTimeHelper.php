<?php
/**
 * Description of DateTimeHelper
 *
 */
namespace app\helpers;

/**
 * List of weeks
 *
 */
class DateTimeHelper
{
    public static function getDaysInMonth($month, $year)
    {
        return cal_days_in_month(CAL_GREGORIAN, $month, $year);
    }

    public static function getCurrentWeek()
    {
        $week = date('W');
        $current_week = $week > 35 ? $week - 35 : $week + 17;
        if ($current_week > 35) {
            $current_week = 35;
        }
        return $current_week;
    }

    public static function getCurrentYear()
    {
        return date('y');
    }

    public static function getCurrentMonth()
    {
        return date('m');
    }

    /* Get current date
    * @return date
    */
    public static function getCurrentDate($d = null)
    {
        if ($d) {
            return date('Y/m/d', $d);
        } else {
            return date('Y/m/d');
        }
    }

    /* Get current date
    * @return date
    */
    public static function displayDate($d = null)
    {
        if ($d) {
            $date = new \DateTime('Y-m-d');
        } else {
            $date = new \DateTime('Y-m-d');
        }
        return $date->format('Y/m/d');
    }

    /* Get current datetime
    * @return datetime
    */
    public static function getCurrentDatetime($d = null)
    {
        if ($d) {
            return date('Y-m-d H:i:s', $d);
        } else {
            return date('Y-m-d H:i:s');
        }
    }
}