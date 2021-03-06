Array::remove = (v) -> $.grep @,(e)->e!=v

class Trackwane.Logger

  @active: []

  @level: 0

  constructor: (@name) ->

  error: ->
    console?.error(arguments)

  warn: ->
    console?.warn(@name, arguments) if Trackwane.Logger.level > 1 && @isActive(@name)

  info: ->
    console?.info(@name,arguments) if Trackwane.Logger.level > 0 && @isActive(@name)

  debug: ->
    console?.debug(@name,arguments) if Trackwane.Logger.level > -1 && @isActive(@name)

  isActive: (name) ->
    name in Trackwane.Logger.active

  @get: (name) ->
    new Trackwane.Logger(name)

  @on: (name) ->
    Trackwane.Logger.active.push(name)

  @off: (name) ->
    @active = Trackwane.Logger.active.remove(name) if @isActive(name)

Trackwane.Logger.on("Services.Animator")