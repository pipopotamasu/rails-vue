require "application_system_test_case"

class HomeTest < ApplicationSystemTestCase
  test "visiting the index" do
    # open top page
    visit root_path

    # 4 person displayed
    assert_text 'Chuck Norris'
    assert_text 'Bruce Lee'
    assert_text 'Jackie Chan'
    assert_text 'Jet Li'

    # filter by 'J'
    fill_in 'query', with: 'J'
    assert_no_text 'Chuck Norris'
    assert_no_text 'Bruce Lee'
    assert_text 'Jackie Chan'
    assert_text 'Jet Li'

    # filter by 'Jet'
    fill_in 'query', with: 'Jet'
    assert_no_text 'Chuck Norris'
    assert_no_text 'Bruce Lee'
    assert_no_text 'Jackie Chan'
    assert_text 'Jet Li'
  end
end
