from unittest import TestCase
from flask import session
from app import app

class BoggleTestCase(TestCase):
    def test_home_page(self):
        """Test that home page route generates and displays home page html page"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text = True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<div id="rules">', html)
            self.assertIsNone(session.get('highScore'))
            self.assertIsNone(session.get('gameCount'))

    def test_board_load(self):
        """Test that game board route generates and displays game board html page"""
        with app.test_client() as client:
            res = client.post('/game-board', data={"highScore": 0, "gameCount": 0})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<form id="word-form', html)

    def test_game_board(self):
        """Test game board session and valid word entry"""
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [["B", "Z", "N", "A", "Z"], 
                                           ["C", "E", "O", "G", "M"], 
                                           ["M", "R", "A", "F", "H"], 
                                           ["L", "Q", "N", "T", "T"], 
                                           ["T", "S", "E", "O", "P"]]

            response = client.get('/guess?guess=beat')
            self.assertEqual(response.json['result'], 'ok')

    def test_dict_word_on_board(self):
        """Test if entry is a word in the dictionary but not on board"""
        with app.test_client() as client:
            client.get('/game-board')

            res = client.get('/guess?guess=impossible')
            self.assertEqual(res.json['result'], 'not-on-board')

    def test_entry_in_dict(self):
        """Test if entry is a word in the dictionary"""
        with app.test_client() as client:
            client.get('/game-board')

            res = client.get('/guess?guess=12345')
            self.assertEqual(res.json['result'], 'not-word')


