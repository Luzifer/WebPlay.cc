<?php

class ApiGetStreamFile extends BaseHttpHandler {

  public function post($params) {
    $playlist = $this->request->get('playlist');

    $response = array(
      'status' => 'OK'
    );

    $entries = false;
    $urls = array();

    try {
      $entries = $this->get_playlist($playlist);
    } catch(Exception $ex) {
      $response['status'] = 'FAIL';
      $response['message'] = 'I was not able to fetch your playlist file.';
    }

    $matches = null;
    $returnValue = preg_match_all('/File([0-9]+)=(.*)/', $entries, $matches, PREG_SET_ORDER);

    if($returnValue < 1) {
      $response['status'] = 'FAIL';
      $response['message'] = 'Either this is not a .pls file or it contains no URLs.';
    } else {
      foreach($matches as $match) {
        $urls[$match[1]] = trim($match[2]);
      }
    }

    $response['urls'] = $urls;

    $this->response->json_output($response, $this->request->get('callback'));
  }

  private function get_playlist($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $body = curl_exec($ch);
    curl_close($ch);

    return $body;
  }

}
