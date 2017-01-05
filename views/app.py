from flask_restful import Api, Resource, reqparse
from flask import Flask, Blueprint, request, make_response, render_template, url_for
import os


app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return render_template('index.html')

SCOTCHES = {
	'scotch1' : {'name':'Macallan 12','cost':50},
	'scotch2' : {'name':'Chivas Regal Royal Salute','cost':10000},
	'scotch3' : {'name':'Glenfiddich 1937', 'cost':20000}
}

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('cost')


def abort_if_scotch_doesnt_exist(scotch_id):
    if scotch_id not in SCOTCHES:
        abort(404, message="Scotch {} doesn't exist".format(scotch_id))



class scotch(Resource):
    def get(self, scotch_id):
        abort_if_scotch_doesnt_exist(scotch_id)
        return SCOTCHES[scotch_id]

    def delete(self, scotch_id):
        abort_if_scotch_doesnt_exist(scotch_id)
        del SCOTCHES[scotch_id]
        return '', 204

    def put(self, scotch_id):
        args = parser.parse_args()
        scotch = {'name': args['name'],'cost': args['cost']}
        SCOTCHES[scotch_id] = scotch
        return scotch, 201

class scotchList(Resource):
	def get(self):
		return SCOTCHES.values()

	def post(self):
		args = parser.parse_args()
		scotch_id = int(max(SCOTCHES.keys()).lstrip('scotches')) + 1
		scotch_id = 'scotch%i' % scotch_id
		SCOTCHES[scotch_id] = {'name': args['name'],'cost': args['cost']}
		return SCOTCHES[scotch_id], 201

api.add_resource(scotchList, '/scotches')
api.add_resource(scotch, '/scotches/<scotch_id>')


'''
to get the list: curl http://localhost:5000/scotches

to get a single scotch: curl http://localhost:5000/scotches/scotch{id}

to create a new scotch: curl http://localhost:5000/scotches -d 'name=a_name&cost=a_cost' -X POST -v

to edit a scotch: curl http://localhost:5000/scotches/scotch{id} 'name=new_name&cost=new_cost' -X PUT -v

to delete a scotch: curl http://localhost:5000/scotches/scotch{id} -X DELETE -v
'''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)