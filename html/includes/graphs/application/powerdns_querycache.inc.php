<?php

require 'includes/graphs/common.inc.php';

$scale_min    = 0;
$colours      = 'mixed';
$nototal      = 0;
$unit_text    = 'Packets/sec';
$rrd_filename = $config['rrd_dir'].'/'.$device['hostname'].'/app-powerdns-'.$app['app_id'].'.rrd';
$array        = array(
                 'qc_miss' => array(
                               'descr'  => 'Misses',
                               'colour' => '750F7DFF',
                              ),
                 'qc_hit'  => array(
                               'descr'  => 'Hits',
                               'colour' => '00FF00FF',
                              ),
                );

$i = 0;

if (is_file($rrd_filename)) {
    foreach ($array as $ds => $vars) {
        $rrd_list[$i]['filename'] = $rrd_filename;
        $rrd_list[$i]['descr']    = $vars['descr'];
        $rrd_list[$i]['ds']       = $ds;
        $rrd_list[$i]['colour']   = $vars['colour'];
        $i++;
    }
}
else {
    echo "file missing: $file";
}

require 'includes/graphs/generic_multi_line.inc.php';
