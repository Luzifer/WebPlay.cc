<?php

class FrontendHandler extends BaseHttpHandler {

  public function get($params) {
    $this->response->display('global');
  }

}
