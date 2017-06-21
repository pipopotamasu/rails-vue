require 'test_helper'

class GridsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get grids_index_url
    assert_response :success
  end

end
