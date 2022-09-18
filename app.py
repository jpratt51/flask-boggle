from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

def reverse_str(s):
    return s[::-1]

def is_palindrome(s):
    rev = reverse_str(s)
    return s.lower() == rev.lower()

@app.route('/')
def home_page():
    """Direct user to home page"""
    return render_template('start-game.html')

@app.route('/game-board', methods=['POST','GET'])
def game_board():
    """Save board to session storage and direct user to game-board page"""
    board = boggle_game.make_board()
    session["board"] = board 
    highScore = session.get("highScore", 0)
    gameCount = session.get("gameCount", 0)
    return render_template('game-board.html', board=board, highScore=highScore, gameCount=gameCount)

@app.route('/guess')
def check_word():
    """Check for word in server dictionary"""
    word = request.args['guess']
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result': response})
