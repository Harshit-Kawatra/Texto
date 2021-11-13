from gingerit.gingerit import GingerIt
text=input() 
parser = GingerIt()
print(parser.parse(text)["result"])